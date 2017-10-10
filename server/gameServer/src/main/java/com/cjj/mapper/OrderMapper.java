package com.cjj.mapper;


public interface OrderMapper {
	
//  @Select("SELECT * FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER + 
//		  " WHERE id=#{id}")
//  OrderEntity getOneById(@Param("id") Long id);
//  
//  @Select("SELECT * FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER + 
//		  " WHERE order_num=#{orderNum}")
//  OrderEntity getOneByOrderNum(@Param("orderNum") String orderNum);
//  
//  @Select("SELECT * FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER + 
//		  " WHERE order_num=#{orderNum} AND username=#{username}")
//  OrderEntity getOneByOrderNumAndUsername(@Param("orderNum")String orderNum,@Param("username")String username);
//  
//  @Select("SELECT * FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER + 
//		  " WHERE pay_num=#{payNum} ")
//  OrderEntity getOneByPayNum(@Param("payNum")String payNum);
//  
//  @Select("SELECT * FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER
//			+ " where TIMESTAMPDIFF(HOUR,gmt_create,now()) > 23 AND status=0")
//  List<OrderEntity> getTimeoutOrder();
//  
//  @Select("SELECT aid FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_TRADE_PATENT + 
//		  " WHERE id = (SELECT trading_patent_id FROM  " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER + " WHERE order_num=#{orderNum})")
//  String getAidByOrderNum(@Param("orderNum")String orderNum);
//  
//  @Select("SELECT order_num FROM " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER + 
//		  " order by id desc limit 0,1")
//  String getLastOrderNum();
//  
//  
//  @Update("UPDATE " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER
//			+ " SET status = #{status} WHERE order_num = #{orderNum}")
//  void updateStatus(@Param("orderNum")String orderNum,@Param("status")Short status);
//  
//  @Update("UPDATE " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER
//			+ " SET status = #{status},cur_doc=#{curDoc} WHERE order_num = #{orderNum}")
//  void updateStatusWithDoc(@Param("orderNum")String orderNum,@Param("status")Short status,@Param("curDoc")String curDoc);
//  
//  @Update("UPDATE " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER
//			+ " SET status = #{status},remarks=#{remarks} WHERE order_num = #{orderNum}")
//  void updateStatusWithRemark(@Param("orderNum")String orderNum,@Param("status")Short status,@Param("remarks")String remarks);
//  
//  @Update("UPDATE " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER
//			+ " SET pay_num=#{payNum} WHERE order_num = #{orderNum}")
//  void updatePayNum(@Param("orderNum")String orderNum,@Param("payNum")String payNum);
//  
//  
//  @Insert("INSERT INTO " + DBConsts.DBNAME_BASE + "." + DBConsts.T_ORDER
//		  + " (order_num,username, trading_patent_id, contract_owner_id, contract_assignee_id, new_inventor, remarks, is_delegate,status,extra_fee,total_fee,contact_id,buy_service_status,after_change_info,after_change_status,pay_num) "
//		  + "VALUES (#{orderNum},#{username},#{tradingPatentId},#{contractOwnerId},#{contractAssigneeId},#{newInventor},#{remarks},#{isDelegate},#{status},#{extraFee},#{totalFee},#{contactId},#{buyServiceStatus},#{afterChangeInfo},#{afterChangeStatus},#{payNum})")
//  @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id") 
//  Long insert(OrderEntity order);
  
  
}
