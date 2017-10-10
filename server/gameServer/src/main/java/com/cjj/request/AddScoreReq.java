package com.cjj.request;

import com.cjj.entity.ScoresEntity;
import com.cjj.exception.ValidateException;

public class AddScoreReq extends ScoresEntity implements NeedValidate{

	@Override
	public void validate() {
		if(this.username.length() > 10) {
			throw new ValidateException("装逼失败，名字太长！");
		}
		if(this.remark.length() > 20) 
		{
			throw new ValidateException("装逼失败，内容太长了！");
		}
	}

	@Override
	public String toString() {
		return "AddScoreReq [id=" + id + ", username=" + username + ", score=" + score + ", remark=" + remark + "]";
	}
	
	
}
