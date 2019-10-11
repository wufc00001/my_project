package com.chngc.collect.service;

import com.chngc.collect.dao.BusiDictionariesShapeMapper;
import com.chngc.collect.entity.BusiDictionariesShape;
import com.chngc.collect.util.Dictionaries;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Slf4j
@Service
public class BusiDictionariesShapeService {
    @Resource
    private BusiDictionariesShapeMapper busiDictionariesShapeMapper;

    public List<BusiDictionariesShape> findAll() {
        return busiDictionariesShapeMapper.findAll();
    }

    public BusiDictionariesShape save(BusiDictionariesShape busiDictionariesShape) {
        long num = busiDictionariesShapeMapper.save(busiDictionariesShape);
        return busiDictionariesShape;
    }

    public int saveUpdate(BusiDictionariesShape busiDictionariesShape) {
        int num = busiDictionariesShapeMapper.saveUpdate(busiDictionariesShape);
        List<BusiDictionariesShape> list = Dictionaries.dictionaries_shape;
        for (BusiDictionariesShape shape:list) {
            if (shape.getId().equals(busiDictionariesShape.getId())) {
                shape.setDictionariesValue(busiDictionariesShape.getDictionariesValue());
                shape.setEditUser(busiDictionariesShape.getEditUser());
                shape.setEditTime(busiDictionariesShape.getEditTime());
                break;
            }
        }
        return num;
    }
}