package com.chngc.collect.entity;


import lombok.Data;

import java.io.Serializable;
import java.util.Date;
@Data
public class BusiDictionariesPriceType implements Serializable {

  private Long id;
  private String dictionariesValue;
  private Date editTime;
  private String editUser;

}
