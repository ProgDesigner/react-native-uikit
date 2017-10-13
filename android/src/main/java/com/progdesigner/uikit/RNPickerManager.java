package com.progdesigner.uikit;

import android.graphics.Color;
import android.util.Log;

import com.aigestudio.wheelpicker.core.AbstractWheelPicker;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import java.util.ArrayList;
import java.util.Map;

public class RNPickerManager extends SimpleViewManager<RNPicker> {

    private final static String TAG = RNPickerManager.class.getCanonicalName();
    private static final String REACT_CLASS = "RNPickerAndroid";

    private static final int DEFAULT_TEXT_SIZE = (int) PixelUtil.toPixelFromDIP(12);
    private static final int DEFAULT_ITEM_SPACE = (int) PixelUtil.toPixelFromDIP(21);

    @Override
    protected RNPicker createViewInstance(ThemedReactContext reactContext) {
        RNPicker picker = new RNPicker(reactContext);
        picker.setTextColor(Color.LTGRAY);
        picker.setCurrentTextColor(-11974327);
        picker.setTextSize(DEFAULT_TEXT_SIZE);
        picker.setItemSpace(DEFAULT_ITEM_SPACE);

        return picker;
    }

    @Override
    public Map getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.of(
                ItemSelectedEvent.EVENT_NAME, MapBuilder.of("registrationName", "onValueChange")
        );
    }

    @ReactProp(name="data")
    public void setData(RNPicker picker, ReadableArray items) {
        if (picker != null) {
            ArrayList<Integer> valueData = new ArrayList<>();
            ArrayList<String> labelData = new ArrayList<>();
            for (int i = 0; i < items.size(); i ++) {
                ReadableMap itemMap = items.getMap(i);
                valueData.add(itemMap.getInt("value"));
                labelData.add(itemMap.getString("label"));
            }
            picker.setValueData(valueData);
            picker.setData(labelData);
        }
    }

    @ReactProp(name="selectedIndex")
    public void setSelectedIndex(RNPicker picker, int index) {
        if (picker != null && picker.getState() == AbstractWheelPicker.SCROLL_STATE_IDLE) {
            picker.setItemIndex(index);
            picker.invalidate();
        }
    }

    @ReactProp(name="textColor", customType = "Color")
    public void setTextColor(RNPicker picker, Integer color) {
        if (picker != null) {

            Log.d(TAG, "setTextColor: " + color);

            picker.setCurrentTextColor(color);

            // int a = (color>>24)&0xff;
            // int r = (color>>16)&0xff;
            // int g = (color>>8 )&0xff;
            // int b = (color    )&0xff;

            // double lightenFaction = 0.5;

            // int na = (int)Math.max(a - (a * lightenFaction), 0);
            // int nr = (int)Math.min(r + (r * lightenFaction), 255);
            // int ng = (int)Math.min(g + (g * lightenFaction), 255);
            // int nb = (int)Math.min(b + (b * lightenFaction), 255);

            // int currentTextColor = (a & 0xff) << 24 | (r & 0xff) << 16 | (g & 0xff) << 16 | (b & 0xff);
            // int textColor = (na & 0xff) << 24 | (nr & 0xff) << 16 | (ng & 0xff) << 16 | (nb & 0xff);

            // Log.d(TAG, "currentTextColor: " + currentTextColor);
            // Log.d(TAG, "textColor: " + textColor);

            // picker.setCurrentTextColor(currentTextColor);
            // picker.setTextColor(textColor);
        }
    }

    @ReactProp(name="textSize")
    public void setTextSize(RNPicker picker, int size) {
        if (picker != null) {
            picker.setTextSize((int) PixelUtil.toPixelFromDIP(size));
        }
    }

    @ReactProp(name="itemSpace")
    public void setItemSpace(RNPicker picker, int space) {
        if (picker != null) {
            picker.setItemSpace((int) PixelUtil.toPixelFromDIP(space));
        }
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }
}
