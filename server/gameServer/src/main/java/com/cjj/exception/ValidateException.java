package com.cjj.exception;

public class ValidateException extends RuntimeException {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public ValidateException() {
		super("参数错误");
	}
	public ValidateException(String msg) {
		super(msg);
	}
	
	public ValidateException(String msg, Throwable cause) {
		super(msg, cause);
	}
}
