package com.cjj.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.util.StringUtils;

public class StrUtils {
	public static boolean check(String str, String regex) {
		boolean flag = false;
		try {
			Pattern pattern = Pattern.compile(regex);
			Matcher matcher = pattern.matcher(str);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	// public static String prefix = "http://duyanipr.iok.la:8888";
	public static String prefix = "https://api.duyanipr.com";
	public static SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddhh");
	{
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT+0800"));
	}

	/**
	 * 根据时间生成随机订单号
	 * 
	 * @return
	 */
	public static String genOrderNum(String lastorderNum) {
		if (StringUtils.isEmpty(lastorderNum) || lastorderNum.length() != 12) {
			lastorderNum = "000000000000";
		}
		// channel 1代表网站2代表app,暂时只用1
		String channel = "1";
		String orderTime = channel + dateFormat.format(new Date());
		if (orderTime.equals(lastorderNum.substring(0, lastorderNum.length() - 3))) {
			int index = 1000 + Integer.valueOf(lastorderNum.substring(lastorderNum.length() - 4));
			index++;
			return orderTime + (index + "").substring(1);
		} else {
			return orderTime + "000";
		}
	}

	/**
	 * 根据时间生成随机支付订单号
	 * 
	 * @return
	 */
	public static String genPayNum() {
		// TODO 暂时只用时间戳，功能完成后再加
		String orderNum = String.valueOf(System.currentTimeMillis()) + genRandom6Char();
		return orderNum;
	}

	public static void main(String[] args) {
		System.out.println(removeOuters("[1asdsadasdsad1]"));
		// String s =
		// "/uploadFiles/photos/users/18814887823/jpg/FB1B4A71-8893-4463-99BC-C150C7C3D6CA.jpg";
	}

	public static String genRandom6Char() {
		String s = (Math.round((Math.random() + 1) * 1000000) + "").substring(1);
		return s;
	}
	
	/**去掉两边的[]
	 * @param s
	 * @return
	 */
	public static String removeOuters(String s) {
		if(s == null) {
			return "";
		}
		if(s.startsWith("[")) {
			s = s.substring(1);
		}
		if(s.endsWith("]")) {
			s = s.substring(0,s.length() -1);
		}
		return s;
	}

	/**
	 * 根据专利申请号获取专利类型
	 * 规则：以2003年为界限，之前的是前两位数字代表年份，之后前四位数字代表年份。2003年则部分是前两位算年份，部分前四位代表年份
	 * 
	 * @param aid
	 * @return
	 */
	public static int getPatentType(String aid) {
		if (aid.startsWith("CN")) {
			String year = aid.substring(2, 4);
			if ("20".equals(year)) {
				if (Integer.valueOf(aid.substring(6, 7)) == 8) {
					return 1;
				} else if (Integer.valueOf(aid.substring(6, 7)) == 9) {
					return 2;
				} else {
					return Integer.valueOf(aid.substring(6, 7));
				}
			} else {
				if (Integer.valueOf(aid.substring(4, 5)) == 8) {
					return 1;
				} else if (Integer.valueOf(aid.substring(4, 5)) == 9) {
					return 2;
				} else {
					return Integer.valueOf(aid.substring(4, 5));
				}
			}
		}
		return 1;
	}

	/**
	 * 根据数据库里存放的图片路径，拼接绝对图片网络地址
	 * 
	 * @param prefix
	 * @param path
	 * @return
	 */
	public static String getAbsolutePicUrl(String path) {

		return prefix + path;// path.replaceAll("\\\\", "/");
	}

	/**
	 * 验证手机号码
	 * 
	 * 移动号码段:134、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188
	 * 联通号码段:130、131、132、136、145、155、156、176、185、186
	 * 电信号码段:133、153、173、177、180、181、189
	 * 
	 * @param phone
	 * @return
	 */
	public static boolean PHONE(String phone) {
		if (!StringUtils.isEmpty(phone)) {
			String regex = "^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17[3,6-8])|(18[0-9]))\\d{8}$";
			return check(phone, regex);
		}
		return false;
	}

	/**
	 * 验证姓名格式
	 * 
	 * @param name
	 * @return
	 */
	public static boolean NAME(String name) {
		if (!StringUtils.isEmpty(name)) {
			return true;
		}
		return false;
	}

	/**
	 * 验证地址格式
	 * 
	 * @param address
	 * @return
	 */
	public static boolean ADDRESS(String address) {
		if (!StringUtils.isEmpty(address)) {
			return true;
		}
		return false;
	}

	/**
	 * 验证银行卡格式
	 * 
	 * @param bankCard
	 * @return
	 */
	public static boolean BANK_CARD(String bankCard) {
		if (!StringUtils.isEmpty(bankCard)) {
			return true;
		}
		return false;
	}

	/**
	 * 验证电子邮件格式
	 * 
	 * @param email
	 * @return
	 */
	public static boolean EMAIL(String email) {
		if (!StringUtils.isEmpty(email)) {
			String regex = "^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z0-9]{2,4}$";
			return check(email, regex);
		}
		return false;
	}

	public static boolean EMPTY(String s) {
		return StringUtils.isEmpty(s);
	}

}
