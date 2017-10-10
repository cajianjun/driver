package com.cjj.response;

public class GeneralResponse {

	private Object data;
	private Integer errCode;

	public GeneralResponse(Object data, Integer errCode) {
		super();
		this.errCode = errCode;
		this.data = data;
	}

	public Integer getErrCode() {
		return errCode;
	}

	public void setErrCode(Integer errCode) {
		this.errCode = errCode;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

}
