package com.chngc.collect.util;

import java.util.UUID;

public class UUIDUtils {

    public static String getUUID() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
