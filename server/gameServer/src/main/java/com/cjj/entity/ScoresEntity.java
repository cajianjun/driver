package com.cjj.entity;
public class ScoresEntity{
	protected Integer id;
	protected String username;
	protected Long score;
	protected String remark;
	public ScoresEntity(){}
	public ScoresEntity(Integer id,String username,Long score,String remark){
		this();
		this.id=id;
		this.username=username;
		this.score=score;
		this.remark=remark;
	}
	public void setId(Integer id){this.id=id;}
	public Integer getId(){return id;}
	public void setUsername(String username){this.username=username;}
	public String getUsername(){return username;}
	public void setScore(Long score){this.score=score;}
	public Long getScore(){return score;}
	public void setRemark(String remark){this.remark=remark;}
	public String getRemark(){return remark;}
}