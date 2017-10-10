package com.cjj.game.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.cjj.common.Constants;
import com.cjj.common.ErrorCode;
import com.cjj.game.service.GameCenterService;
import com.cjj.request.AddScoreReq;
import com.cjj.response.GeneralResponse;

@RestController
@RequestMapping(value = Constants.GAME_CENTER)
public class GameCenterController {
	private static final Logger logger = LoggerFactory.getLogger(GameCenterController.class);
	
	@Autowired
	GameCenterService gameCenterSerice;
	
	@RequestMapping(value = "add", method = RequestMethod.POST)
	public GeneralResponse getContractOwner(@RequestBody AddScoreReq request) {
		logger.info("add record,req=" + request.toString());
		try {
			request.validate();
		} catch (Exception e) {
			logger.info("request format error,error msg=" + e.getMessage());
			return new GeneralResponse(e.getMessage(), ErrorCode.FAIL);
		}
		gameCenterSerice.addScores(request);
		return new GeneralResponse(Constants.TASK_SUCCESS, ErrorCode.OK);
	}
	
	@RequestMapping(value = "top10", method = RequestMethod.POST)
	public GeneralResponse top10() {
		logger.info("top10");
		return new GeneralResponse(gameCenterSerice.getTopTen(), ErrorCode.OK);
	}
}
