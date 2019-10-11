package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesRatingAgenciesMapper;
import com.chngc.collect.entity.BusiDictionariesRatingAgencies;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Author:
 * @Description:字典-鉴定评级机构
 * @Date:Create：in 2019/8/29 15:45
 * @Modified By：
 */
@Slf4j
@Service
public class BusiDictionariesRatingAgenciesService {
    @Autowired
    private BusiDictionariesRatingAgenciesMapper busiDictionariesRatingAgenciesMapper;
    /**
     * 新增
     * @param agencies
     */
    public int save(BusiDictionariesRatingAgencies agencies) {
        int id = busiDictionariesRatingAgenciesMapper.insert(agencies);
        if(id > 0){
            Dictionaries.dictionaries_rating_agencies.add(agencies);
        }
        return id;
    }

    /**
     * 列表
     * @return
     */
    public List<BusiDictionariesRatingAgencies> list() {
        List<BusiDictionariesRatingAgencies> Agencieses= busiDictionariesRatingAgenciesMapper.selectAll();
        return Agencieses;
    }

    /**
     *修改
     * @param agencies
     */
    public int saveUpdate(BusiDictionariesRatingAgencies agencies) {
        int i = busiDictionariesRatingAgenciesMapper.updateByPrimaryKey(agencies);
        if (i>0){
            List<BusiDictionariesRatingAgencies> Agencieses = Dictionaries.dictionaries_rating_agencies;
            for (BusiDictionariesRatingAgencies busiAgencies:Agencieses) {
                if (busiAgencies.getId().equals(agencies.getId())) {
                    busiAgencies.setDictionariesValue(agencies.getDictionariesValue());
                    busiAgencies.setEditTime(agencies.getEditTime());
                    busiAgencies.setEditUser(agencies.getEditUser());
                    break;
                }
            }
        }
        return i;
    }

    /**
     * 查询
     * @return
     */
    public BusiDictionariesRatingAgencies selectById(Long id) {
        BusiDictionariesRatingAgencies agencies= busiDictionariesRatingAgenciesMapper.selectByPrimaryKey(id);
        return agencies;
    }
}
