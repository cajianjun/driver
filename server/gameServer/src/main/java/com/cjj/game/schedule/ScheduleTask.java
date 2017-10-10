package com.cjj.game.schedule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class ScheduleTask {
	final Logger logger = LoggerFactory.getLogger(this.getClass());

//	 /**
//	 * 带支付状态超过24小时的订单处理成关闭状态
//	 */
//	@Scheduled(cron="0 */5 * * * ?") 
//	 public void executeTimeoutOrderClear() {
//		
//	 }
}
