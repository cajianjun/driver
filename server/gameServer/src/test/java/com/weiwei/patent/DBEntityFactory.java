package com.weiwei.patent;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSetMetaData;

public class DBEntityFactory {

	private String packageOutPath = "com.cjj.entity";
	private String tablename = "scores";
	private String dbname = "game_center";
	private String[] colnames;
	private String[] colTypes;
	private boolean util = false;
	private boolean decimal = false;
	String lineSeparator = System.getProperty("line.separator", "\n");  

	public static void main(String[] args) {
		new DBEntityFactory();
	}
	
	public DBEntityFactory() {
		try {
			Class.forName("com.mysql.jdbc.Driver");
			Connection con = DriverManager.getConnection("jdbc:mysql://106.14.203.125:3306/" + dbname + "?autoReconnect=true&useSSL=false", "root", "caojianjun666");
			PreparedStatement pStemt = con.prepareStatement("select * from " + dbname + "." + tablename);
			ResultSetMetaData rsmd = pStemt.getMetaData();
			int size = rsmd.getColumnCount();
			colnames = new String[size];
			colTypes = new String[size];
			for (int i = 0; i < size; i++) {
				colnames[i] = rsmd.getColumnName(i + 1);
				colTypes[i] = rsmd.getColumnTypeName(i + 1);
				if (colTypes[i].equalsIgnoreCase("datetime")) {
					util = true;
				}
				if (colTypes[i].equalsIgnoreCase("decimal")) {
					decimal = true;
				}
//				if (colTypes[i].equalsIgnoreCase("image") || colTypes[i].equalsIgnoreCase("text")) {
//					sql = true;
//				}
			}
			String content = parse(colnames, colTypes);
			File directory = new File("");
			String outputPath = directory.getAbsolutePath() + "/src/main/java/" + this.packageOutPath.replace(".", "/") + "/"
					+ initcap(name2Tuofeng(tablename)) + "Entity.java";
			createIfNotExist(outputPath);
			FileWriter fw = new FileWriter(outputPath);
			
			
			PrintWriter pw = new PrintWriter(fw);
			pw.print(content);
			pw.flush();
			pw.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void createIfNotExist(String s ) {
		File f = new File(s);
		if(!f.exists()) {
			try {
				f.createNewFile();
				System.out.println("create new file success,path=" + s);
			} catch (IOException e) {
				System.out.println("create new file failed,path=" + s);
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 下划线风格的字符串转化成驼峰命名的字符串例如：table_user ->tableUser
	 * @param s
	 * @return
	 */
	private static String name2Tuofeng(String s) {
		String[] ss = s.split("_");
		StringBuilder sb = new StringBuilder();
		int i = 0;
		for(String shortS :ss) {
			if(i == 0) {
				i ++;
				sb.append(shortS);
				continue;
			}
			shortS = initcap(shortS);
			sb.append(shortS);
		}
		return sb.toString();
	}
	
	/**
	 * 末尾连接结束符
	 * @param sb
	 * @param content
	 */
	private void appendL(StringBuilder sb,String content) {
		sb.append(content).append(lineSeparator);
	}

	private String parse(String[] colnames, String[] colTypes) {
		StringBuilder sb = new StringBuilder();
		appendL(sb, "package " + this.packageOutPath + ";");
		if (util) {
			appendL(sb,"import java.util.Date;");
		}
		if(decimal) {
			appendL(sb,"import java.math.BigDecimal;");
		}
		appendL(sb,"public class " + initcap(name2Tuofeng(tablename)) + "Entity{");
		for (int i = 0; i < colnames.length; i++) {
			appendL(sb,"	protected " + sqlType2JavaType(colTypes[i]) + " " + name2Tuofeng(colnames[i]) + ";");
		}
		appendL(sb,"	public " + initcap(name2Tuofeng(tablename)) + "Entity(){}");
		sb.append("	public " + initcap(name2Tuofeng(tablename)) + "Entity(");
		for (int j = 0; j < colnames.length; j++) {
			sb.append(sqlType2JavaType(colTypes[j]) + " " + name2Tuofeng(colnames[j]));
			if (j != colnames.length - 1)
				sb.append(",");
		}
		appendL(sb,"){");
		appendL(sb,"		this();");
		for (int s = 0; s < colnames.length; s++) {
			appendL(sb,"		this." + name2Tuofeng(colnames[s]) + "=" + name2Tuofeng(colnames[s]) + ";");
		}
		appendL(sb,"	}");
		for (int i = 0; i < colnames.length; i++) {
			sb.append("	public void set" + initcap(name2Tuofeng(colnames[i])) 
			+ "(" + sqlType2JavaType(colTypes[i]) + " " + name2Tuofeng(colnames[i])
					+ "){");
			sb.append("this." + name2Tuofeng(colnames[i]) + "=" + name2Tuofeng(colnames[i]) + ";");
			sb.append("}");
			appendL(sb,"");
			sb.append("	public " + sqlType2JavaType(colTypes[i]) + " get" + initcap(name2Tuofeng(colnames[i])) + "(){");
			sb.append("return " + name2Tuofeng(colnames[i]) + ";");
			sb.append("}");
			appendL(sb,"");
		}
		sb.append("}");
		return sb.toString();
	}

	/**
	 * 首字母大写
	 * @param str
	 * @return
	 */
	private static String initcap(String str) {
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	}

	private String sqlType2JavaType(String sqlType) {
		
		sqlType = sqlType.replace("UNSIGNED","");
		sqlType = sqlType.trim();
		if (sqlType.equalsIgnoreCase("bit")) {
			return "boolean";
		} else if (sqlType.equalsIgnoreCase("tinyint")) {
			return "Short";
		} else if (sqlType.equalsIgnoreCase("smallint")) {
			return "Short";
		} else if (sqlType.equalsIgnoreCase("int")) {
			return "Integer";
		} else if (sqlType.equalsIgnoreCase("bigint")) {
			return "Long";
		} else if (sqlType.equalsIgnoreCase("float")) {
			return "Float";
		} else if(sqlType.equalsIgnoreCase("decimal")){
			return "BigDecimal";
		} else if (sqlType.equalsIgnoreCase("numeric")
				|| sqlType.equalsIgnoreCase("real") || sqlType.equalsIgnoreCase("money")
				|| sqlType.equalsIgnoreCase("smallmoney")) {
			return "Double";
		} else if (sqlType.equalsIgnoreCase("varchar") || sqlType.equalsIgnoreCase("char")
				|| sqlType.equalsIgnoreCase("nvarchar") || sqlType.equalsIgnoreCase("nchar")
				|| sqlType.equalsIgnoreCase("text")) {
			return "String";
		} else if (sqlType.equalsIgnoreCase("datetime")) {
			return "Date";
		} else if (sqlType.equalsIgnoreCase("image")) {
			return "Blod";
		}else {
			System.out.println("sqlType=" + sqlType + ",cant be recogized");
		}
		return null;
	}


}