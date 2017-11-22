package com.cjj.game.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cjj.dto.face.FaceRecDTO;
import com.cjj.game.service.FaceService;
import com.cjj.util.FaceUtil;

@Service
public class FaceServiceImpl implements FaceService{

	@Override
	public String getAge(String picUrl) {
		List<FaceRecDTO> dtos = FaceUtil.getFaceDTO(picUrl);
		if(dtos != null && dtos.size() > 0) {
			return dtos.get(0).getFaceAttributes().getAge() + "";
		}
		return "";
	}

}
