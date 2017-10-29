package com.cjj.game.service.impl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cjj.entity.ScoresEntity;
import com.cjj.game.service.GameCenterService;
import com.cjj.mapper.ScoresMapper;
import com.cjj.request.AddScoreReq;

@Service
public class GameCenterServiceImpl implements GameCenterService {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

//	@Autowired
//	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ScoresMapper scoresMapper;
	
	@Override
	public void addScores(AddScoreReq request) {
		request.setUsername(request.getUsername());
		scoresMapper.insert(new ScoresEntity(0,request.getUsername(),request.getScore()
				,request.getRemark()));
	}

	@Override
	public List<ScoresEntity> getTopTen() {
		
		return scoresMapper.getOrderByScore("game_center");
	}
	
}
