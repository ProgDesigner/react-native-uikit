//
//  RCTConvert+RNPermissionsStatus.m
//  RCTPermissions
//

#import "RCTConvert+RNPStatus.h"

@implementation RCTConvert (RNPStatus)

RCT_ENUM_CONVERTER(RNPType, (@{ @"location" : @(RNPTypeLocation),
                                @"camera" : @(RNPTypeCamera),
                                @"microphone" : @(RNPTypeMicrophone),
                                @"photo" : @(RNPTypePhoto),
                                @"contacts" : @(RNPTypeContacts),
                                @"event" : @(RNPTypeEvent),
                                @"reminder" : @(RNPTypeReminder),
                                @"bluetooth" : @(RNPTypeBluetooth),
                                @"notification" : @(RNPTypeNotification),
                                @"backgroundRefresh": @(RNPTypeBackgroundRefresh),
                                @"speechRecognition": @(RNPTypeSpeechRecognition)
                                }),
                                RNPTypeUnknown, integerValue)

@end
