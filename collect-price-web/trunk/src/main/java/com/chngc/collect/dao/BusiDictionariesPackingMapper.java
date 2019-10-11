package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesPacking;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

 /**
 * 功能描述:字典-包装版本
 * @Author:
 * @Date: 2019/8/29 14:47
 */
 @SqlMapper
public interface BusiDictionariesPackingMapper {
     /**
      * 新增
      * @param record
      * @return
      */
     int insert(BusiDictionariesPacking record);

     /**
      * 查询
      * @param id
      * @return
      */
    BusiDictionariesPacking selectByPrimaryKey(Long id);

     /**
      * 列表
      * @return
      */
    List<BusiDictionariesPacking> selectAll();

     /**
      * 修改
      * @param record
      * @return
      */
    int updateByPrimaryKey(BusiDictionariesPacking record);
}