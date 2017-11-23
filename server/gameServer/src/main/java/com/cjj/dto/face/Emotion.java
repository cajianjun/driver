package com.cjj.dto.face;

public class Emotion{
    /**
     * 生气
     */
    private float anger;
	/**
	 * 鄙视
	 */
	private float contempt;
	/**
	 * 厌恶
	 */
	private float disgust;
	/**
	 * 恐惧
	 */
	private float fear;
	/**
	 * 开心
	 */
	private float happiness;
	/**
	 * 自然
	 */
	private float neutral;
	/**
	 * 悲伤
	 */
	private float sadness;
	/**
	 * 惊喜
	 */
	private float surprise;
	
	public Emotion() {
		super();
	}
	public float getAnger() {
		return anger;
	}
	public void setAnger(float anger) {
		this.anger = anger;
	}
	public float getContempt() {
		return contempt;
	}
	public void setContempt(float contempt) {
		this.contempt = contempt;
	}
	public float getDisgust() {
		return disgust;
	}
	public void setDisgust(float disgust) {
		this.disgust = disgust;
	}
	public float getFear() {
		return fear;
	}
	public void setFear(float fear) {
		this.fear = fear;
	}
	public float getHappiness() {
		return happiness;
	}
	public void setHappiness(float happiness) {
		this.happiness = happiness;
	}
	public float getNeutral() {
		return neutral;
	}
	public void setNeutral(float neutral) {
		this.neutral = neutral;
	}
	public float getSadness() {
		return sadness;
	}
	public void setSadness(float sadness) {
		this.sadness = sadness;
	}
	public float getSurprise() {
		return surprise;
	}
	public void setSurprise(float surprise) {
		this.surprise = surprise;
	}
	
}
