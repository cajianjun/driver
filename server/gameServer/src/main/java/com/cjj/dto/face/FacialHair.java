package com.cjj.dto.face;

public class FacialHair{
    /**
     * 上嘴唇小胡子
     */
    private float moustache;
	/**
	 * 络腮胡
	 */
	private float beard;
	/**
	 * 两边鬓胡
	 */
	private float sideburns;
	
	public FacialHair() {
		super();
	}
	public float getMoustache() {
		return moustache;
	}
	public void setMoustache(float moustache) {
		this.moustache = moustache;
	}
	public float getBeard() {
		return beard;
	}
	public void setBeard(float beard) {
		this.beard = beard;
	}
	public float getSideburns() {
		return sideburns;
	}
	public void setSideburns(float sideburns) {
		this.sideburns = sideburns;
	}
	
}
