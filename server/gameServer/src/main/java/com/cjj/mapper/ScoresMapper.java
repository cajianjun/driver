package com.cjj.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;

import com.cjj.common.DBConsts;
import com.cjj.entity.ScoresEntity;

public interface ScoresMapper {
    @Select("SELECT * FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.TABLE_SCORES + 
	  " ORDER BY score desc limit 0,10")
    List<ScoresEntity> getOrderByScore();
  
	@Insert("INSERT INTO " + DBConsts.DBNAME_BASE + "." + DBConsts.TABLE_SCORES
	  + " (username,score,remark) "
	  + "VALUES (#{username},#{score},#{remark})")
	void insert(ScoresEntity entity);
}
