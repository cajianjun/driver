package com.cjj.game.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cjj.common.Constants;
import com.cjj.common.ErrorCode;
import com.cjj.game.service.FaceService;
import com.cjj.request.SingleValueReq;
import com.cjj.response.GeneralResponse;

@RestController
@RequestMapping(value = Constants.FACE_REC)
public class FaceController {
	private static final Logger logger = LoggerFactory.getLogger(FaceController.class);
	
	@Autowired
	FaceService faceService;
	
	@RequestMapping(value = "age", method = RequestMethod.POST)
	public GeneralResponse getAge(@RequestBody  SingleValueReq req) {
		logger.info("get age,req=" + req.toString());
		String age = "";
		try {
			String url = req.getValue();
			age = faceService.getAge(url);
		} catch (Exception e) {
			logger.info("request format error,error msg=" + e.getMessage());
			return new GeneralResponse(e.getMessage(), ErrorCode.FAIL);
		}
		return new GeneralResponse(age, ErrorCode.OK);
	}
	
	@RequestMapping(value = "all", method = RequestMethod.POST)
	public GeneralResponse getAll(@RequestBody  SingleValueReq req) {
		logger.info("get all,req=" + req.toString());
		try {
			String url = req.getValue();
			return new GeneralResponse(faceService.getAll(url), ErrorCode.OK);
		} catch (Exception e) {
			logger.info("request format error,error msg=" + e.getMessage());
			return new GeneralResponse(e.getMessage(), ErrorCode.FAIL);
		}
	}
	
	/**
	 * 文件上传接口
	 * 
	 * @param file
	 * @return
	 */
	@RequestMapping(value = "file", method = RequestMethod.POST)
	public GeneralResponse uploadWithIdCardPhoto(@RequestParam("file") MultipartFile file) {
		if (file.isEmpty()) {
			return new GeneralResponse(Constants.TASK_FAILED, ErrorCode.FAIL);
		}
		Path path = null;
		String pathStr = "";
		try {
			byte[] bytes = file.getBytes();
			PathWithStr pws = genFilePath(file);
			path = pws.getPath();
			pathStr = pws.getPathStr();
			logger.info("Write file to {}.", path);
			Files.write(path, bytes);
		} catch (Exception e) {
			logger.error("Write file error!", e);
			e.printStackTrace();
			return new GeneralResponse(Constants.TASK_FAILED, ErrorCode.FAIL);
		}

		String url = "http://game.nobbican.com" + pathStr;

		return new GeneralResponse(url, ErrorCode.OK);
	}
	
	/**
	 * generate file path according to name
	 * 
	 * @param name
	 * @return
	 */
	private PathWithStr genFilePath(MultipartFile file) {
		Path path = null;
		String surfix = file.getOriginalFilename().split("\\.")[1];
		String randomName = generateToken();
		String pathStr = "/uploadFiles/photos/users" + "/" + surfix + "/";
		path = Paths.get(pathStr,
				randomName + "." + surfix);
		pathStr = pathStr +
				randomName + "." + surfix;
		logger.info("pathStr=" + pathStr);
		File f = new File(path.getParent().toString());
		if (!f.exists()) {
			try {
				Files.createDirectories(path.getParent());
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		PathWithStr ret = new PathWithStr();
		ret.setPath(path);
		ret.setPathStr(pathStr);
		return ret;
	}
	
	public class PathWithStr {
		private Path path;
		private String pathStr;
		public Path getPath() {
			return path;
		}
		public void setPath(Path path) {
			this.path = path;
		}
		public String getPathStr() {
			return pathStr;
		}
		public void setPathStr(String pathStr) {
			this.pathStr = pathStr;
		}
		public PathWithStr() {
			super();
		}
		
	}
	
	public static String generateToken() {
		return UUID.randomUUID().toString().toUpperCase();
	}
}
