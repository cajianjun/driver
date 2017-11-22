package com.cjj.request;

public class SingleValueReq {
	private String value;

	
	public SingleValueReq() {
		super();
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public SingleValueReq(String value) {
		super();
		this.value = value;
	}

	@Override
	public String toString() {
		return "SingleValueReq [value=" + value + "]";
	}
	
	
	
}
