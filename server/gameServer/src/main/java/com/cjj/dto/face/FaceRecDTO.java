package com.cjj.dto.face;

public class FaceRecDTO {
	
	private String faceId;
	private FaceRectangle faceRectangle;
	private FaceAttributes faceAttributes;
	
	public FaceRecDTO() {
		super();
	}
	public String getFaceId() {
		return faceId;
	}
	public void setFaceId(String faceId) {
		this.faceId = faceId;
	}
	public FaceRectangle getFaceRectangle() {
		return faceRectangle;
	}
	public void setFaceRectangle(FaceRectangle faceRectangle) {
		this.faceRectangle = faceRectangle;
	}
	public FaceAttributes getFaceAttributes() {
		return faceAttributes;
	}
	public void setFaceAttributes(FaceAttributes faceAttributes) {
		this.faceAttributes = faceAttributes;
	}
	
}



