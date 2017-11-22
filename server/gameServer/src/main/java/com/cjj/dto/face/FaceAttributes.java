package com.cjj.dto.face;

import java.util.List;


public class FaceAttributes{
	private float smile;
	private HeadPose headPose;
	private String gender;
	private float age;
	private FacialHair facialHair;
	private String glasses;
	private Emotion emotion;
	private Blur blur;
	private Exposure exposure;
	private Noise noise;
	private Makeup makeup;
	private List<Object> accessories;
	private Occlusion occlusion;
	private Hair hair;
	
	public FaceAttributes() {
		super();
	}
	public float getSmile() {
		return smile;
	}
	public void setSmile(float smile) {
		this.smile = smile;
	}
	public HeadPose getHeadPose() {
		return headPose;
	}
	public void setHeadPose(HeadPose headPose) {
		this.headPose = headPose;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public float getAge() {
		return age;
	}
	public void setAge(float age) {
		this.age = age;
	}
	public FacialHair getFacialHair() {
		return facialHair;
	}
	public void setFacialHair(FacialHair facialHair) {
		this.facialHair = facialHair;
	}
	public String getGlasses() {
		return glasses;
	}
	public void setGlasses(String glasses) {
		this.glasses = glasses;
	}
	public Emotion getEmotion() {
		return emotion;
	}
	public void setEmotion(Emotion emotion) {
		this.emotion = emotion;
	}
	public Blur getBlur() {
		return blur;
	}
	public void setBlur(Blur blur) {
		this.blur = blur;
	}
	public Exposure getExposure() {
		return exposure;
	}
	public void setExposure(Exposure exposure) {
		this.exposure = exposure;
	}
	public Noise getNoise() {
		return noise;
	}
	public void setNoise(Noise noise) {
		this.noise = noise;
	}
	public Makeup getMakeup() {
		return makeup;
	}
	public void setMakeup(Makeup makeup) {
		this.makeup = makeup;
	}
	public List<Object> getAccessories() {
		return accessories;
	}
	public void setAccessories(List<Object> accessories) {
		this.accessories = accessories;
	}
	public Occlusion getOcclusion() {
		return occlusion;
	}
	public void setOcclusion(Occlusion occlusion) {
		this.occlusion = occlusion;
	}
	public Hair getHair() {
		return hair;
	}
	public void setHair(Hair hair) {
		this.hair = hair;
	}
	
}
