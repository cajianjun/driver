package com.cjj.dto.face;

import java.util.List;

public class Hair{
	private float bald;
	private boolean invisible;
	private List<HairColor> hairColor;
	
	public Hair() {
		super();
	}
	public float getBald() {
		return bald;
	}
	public void setBald(float bald) {
		this.bald = bald;
	}
	public boolean isInvisible() {
		return invisible;
	}
	public void setInvisible(boolean invisible) {
		this.invisible = invisible;
	}
	public List<HairColor> getHairColor() {
		return hairColor;
	}
	public void setHairColor(List<HairColor> hairColor) {
		this.hairColor = hairColor;
	}
	
}