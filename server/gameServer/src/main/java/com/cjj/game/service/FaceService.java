package com.cjj.game.service;

import com.cjj.dto.face.FaceRecDTO;

public interface FaceService {
	String getAge(String picUrl);
	FaceRecDTO getAll(String picUrl);
}
