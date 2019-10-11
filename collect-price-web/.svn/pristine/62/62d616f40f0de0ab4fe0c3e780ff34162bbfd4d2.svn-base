package com.chngc.collect.service;

import com.chngc.collect.dao.CoreComponentMapper;
import com.chngc.collect.entity.CoreComponent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wufc on 2019/8/23.
 */
@Slf4j
@Service
public class CoreComponentService {
    @Autowired
    private CoreComponentMapper coreComponentMapper;

    public List<CoreComponent> getAll(){
       return coreComponentMapper.getAll();
    }

    public String findCoreComponentByCode(String permissionCode) {
        return coreComponentMapper.findCoreComponentByCode(permissionCode);
    }
}
