package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesRatingAgencies;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

 /**
 * 功能描述:字典-鉴定评级机构
 * @Author:
 * @Date: 2019/8/29 14:48
 */
 @SqlMapper
public interface BusiDictionariesRatingAgenciesMapper {

     /**
      * 新增
      * @param record
      * @return
      */
     int insert(BusiDictionariesRatingAgencies record);

     /**
      * 查询
      * @param id
      * @return
      */
    BusiDictionariesRatingAgencies selectByPrimaryKey(Long id);

     /**
      * 列表
      * @return
      */
    List<BusiDictionariesRatingAgencies> selectAll();

     /**
      * 修改
      * @param record
      * @return
      */
    int updateByPrimaryKey(BusiDictionariesRatingAgencies record);
}