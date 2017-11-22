package com.cjj.dto.face;

public class HairColor{
	private String color;
	private float confidence;
	
	public HairColor() {
		super();
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public float getConfidence() {
		return confidence;
	}
	public void setConfidence(float confidence) {
		this.confidence = confidence;
	}
	
}
