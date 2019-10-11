package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesWeightMapper;
import com.chngc.collect.entity.BusiDictionariesWeight;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Service
public class BusiDictionariesWeightService {
    @Resource
    private BusiDictionariesWeightMapper busiDictionariesWeightMapper;

    public List<BusiDictionariesWeight> findAll() {
        return busiDictionariesWeightMapper.findAll();
    }

    public BusiDictionariesWeight save(BusiDictionariesWeight busiDictionariesWeight) {
         busiDictionariesWeightMapper.save(busiDictionariesWeight);
         return busiDictionariesWeight;
    }

    public int saveUpdate(BusiDictionariesWeight busiDictionariesWeight) {
        int num = busiDictionariesWeightMapper.saveUpdate(busiDictionariesWeight);
        List<BusiDictionariesWeight> list = Dictionaries.dictionaries_weight;
        for (BusiDictionariesWeight weight:list) {
            if (weight.getId().equals(busiDictionariesWeight.getId())) {
                weight.setDictionariesValue(busiDictionariesWeight.getDictionariesValue());
                weight.setEditUser(busiDictionariesWeight.getEditUser());
                weight.setEditTime(busiDictionariesWeight.getEditTime());
                break;
            }
        }
        return num;
    }
}