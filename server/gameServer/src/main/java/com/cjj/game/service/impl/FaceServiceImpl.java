package com.cjj.game.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.cjj.dto.face.FaceRecDTO;
import com.cjj.game.service.FaceService;
import com.cjj.util.FaceUtil;

@Service
public class FaceServiceImpl implements FaceService{
	private static final Logger logger = LoggerFactory.getLogger(FaceServiceImpl.class);
	@Override
	public String getAge(String picUrl) {
		List<FaceRecDTO> dtos = FaceUtil.getFaceDTO(picUrl);
		if(dtos != null && dtos.size() > 0) {
			return dtos.get(0).getFaceAttributes().getAge() + "";
		}
		return "";
	}

	@Override
	public FaceRecDTO getAll(String picUrl) {
		List<FaceRecDTO> dtos = FaceUtil.getFaceDTO(picUrl);
		if(dtos != null && dtos.size() > 0) {
			logger.info("get one face info");
			return dtos.get(0);
		}
		logger.info("get none face info");
		return null;
	}

}
