package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesPriceSourceMapper;
import com.chngc.collect.entity.BusiDictionariesPriceSource;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
/**
 * Created by guolw on 2019/8/30.
 */
@Slf4j
@Service
public class BusiDictionariesPriceSourceService {
    @Autowired
    private BusiDictionariesPriceSourceMapper busiDictionariesPriceSourceMapper;

    /**
     * 价格来源查询列表
     * @return
     */
    public List<BusiDictionariesPriceSource> getLsit(){
        return busiDictionariesPriceSourceMapper.getList();
    }

    /**
     * 价格来源新增保存
     * @param dictionariesValue
     * @param userId
     * @return
     */
    public BusiDictionariesPriceSource save(String dictionariesValue, String userId){
        BusiDictionariesPriceSource busiDictionariesPriceSource = new BusiDictionariesPriceSource();
        busiDictionariesPriceSource.setDictionariesValue(dictionariesValue);
        busiDictionariesPriceSource.setEditTime(new Date());
        busiDictionariesPriceSource.setEditUser(userId);
        Long num = busiDictionariesPriceSourceMapper.save(busiDictionariesPriceSource);
        if(num > 0){
            Dictionaries.dictionaries_price_source.add(busiDictionariesPriceSource);
        }
        return busiDictionariesPriceSource;
    }

    /**
     * 价格来源更新
     * @param
     * @return
     */
    public Long saveUpdate(Long id, String userId, String dictionariesValue){
        BusiDictionariesPriceSource busiDictionariesPriceSource = new BusiDictionariesPriceSource();
        busiDictionariesPriceSource.setId(id);
        busiDictionariesPriceSource.setEditUser(userId);
        busiDictionariesPriceSource.setEditTime(new Date());
        busiDictionariesPriceSource.setDictionariesValue(dictionariesValue);
        Long num = busiDictionariesPriceSourceMapper.saveUpdate(busiDictionariesPriceSource);
        if(num > 0){
            List<BusiDictionariesPriceSource> list = Dictionaries.dictionaries_price_source;
            for (BusiDictionariesPriceSource busiPriceSource:list) {
                if (busiPriceSource.getId().equals(busiDictionariesPriceSource.getId())) {
                    busiPriceSource.setDictionariesValue(busiDictionariesPriceSource.getDictionariesValue());
                    busiPriceSource.setEditTime(busiDictionariesPriceSource.getEditTime());
                    busiPriceSource.setEditUser(busiDictionariesPriceSource.getEditUser());
                    break;
                }
            }
        }
        return num;
    }
}
