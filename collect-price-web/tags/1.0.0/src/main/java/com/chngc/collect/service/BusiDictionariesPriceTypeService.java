package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesPriceTypeMapper;
import com.chngc.collect.entity.BusiDictionariesPriceType;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
/**
 * Created by guolw on 2019/8/29.
 */
@Slf4j
@Service
public class BusiDictionariesPriceTypeService {
    @Autowired
    private BusiDictionariesPriceTypeMapper busiDictionariesPriceTypeMapper;

    /**
     * 价格类型查询列表
     * @return
     */
    public List<BusiDictionariesPriceType> getList(){
        return busiDictionariesPriceTypeMapper.getList();
    }

    /**
     * 价格类型新增保存
     * @param
     * @return
     */
    public BusiDictionariesPriceType save(String dictionariesValue, String userId){
        BusiDictionariesPriceType busiDictionariesPriceType = new BusiDictionariesPriceType();
        busiDictionariesPriceType.setDictionariesValue(dictionariesValue);
        busiDictionariesPriceType.setEditTime(new Date());
        busiDictionariesPriceType.setEditUser(userId);
        Long num = busiDictionariesPriceTypeMapper.save(busiDictionariesPriceType);
        if(num > 0){
            Dictionaries.dictionaries_price_type.add(busiDictionariesPriceType);
        }
        return  busiDictionariesPriceType;
    }

    /**
     * 价格类型更新
     * @param
     * @return
     */
    public Long saveUpdate(Long id, String userId, String dictionariesValue){
        BusiDictionariesPriceType busiDictionariesPriceType = new BusiDictionariesPriceType();
        busiDictionariesPriceType.setId(id);
        busiDictionariesPriceType.setEditUser(userId);
        busiDictionariesPriceType.setEditTime(new Date());
        busiDictionariesPriceType.setDictionariesValue(dictionariesValue);
        Long num = busiDictionariesPriceTypeMapper.saveUpdate(busiDictionariesPriceType);
        if(num > 0){
            List<BusiDictionariesPriceType> list = Dictionaries.dictionaries_price_type;
            for (BusiDictionariesPriceType busiPriceType:list) {
                if (busiPriceType.getId().equals(busiDictionariesPriceType.getId())) {
                    busiPriceType.setDictionariesValue(busiDictionariesPriceType.getDictionariesValue());
                    busiPriceType.setEditTime(busiDictionariesPriceType.getEditTime());
                    busiPriceType.setEditUser(busiDictionariesPriceType.getEditUser());
                    break;
                }
            }
        }
        return num;
    }
}
