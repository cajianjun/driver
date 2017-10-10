package com.cjj.game.service;

import java.util.List;

import com.cjj.entity.ScoresEntity;
import com.cjj.request.AddScoreReq;

public interface GameCenterService {
	void addScores(AddScoreReq request);
	
	List<ScoresEntity> getTopTen();
}
