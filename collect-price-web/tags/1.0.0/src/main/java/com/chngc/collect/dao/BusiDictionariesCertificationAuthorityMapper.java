package com.chngc.collect.dao;

import com.chngc.collect.entity.BusiDictionariesCertificationAuthority;
import com.chngc.core.annotation.SqlMapper;

import java.util.List;

 /**
 * 功能描述: 字典-封装认证机构
 * @Author:
 * @Date: 2019/8/29 14:46
 */
 @SqlMapper
public interface BusiDictionariesCertificationAuthorityMapper {

     /**
      * 新增
      * @param record
      * @return
      */
    int insert(BusiDictionariesCertificationAuthority record);

     /**
      * 主键查询
      * @param id
      * @return
      */
    BusiDictionariesCertificationAuthority selectByPrimaryKey(Long id);

     /**
      * 列表
      * @return
      */
    List<BusiDictionariesCertificationAuthority> selectAll();

     /**
      * 修改
      * @param record
      * @return
      */
    int updateByPrimaryKey(BusiDictionariesCertificationAuthority record);
}