package com.baljc.common.util;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class BooleanToYNConverter implements AttributeConverter<Boolean, Character> {
    @Override
    public Character convertToDatabaseColumn(Boolean attribute){
        return (attribute != null && attribute) ? 'Y' : 'N';
    }
    @Override
    public Boolean convertToEntityAttribute(Character dbData){
        return 'Y' == dbData;
    }
}
