//
//  RNPermissions.m
//  React Native UIKit
//

@import Contacts;

#import "RNPermissions.h"

#if __has_include(<React/RCTBridge.h>)
  #import <React/RCTBridge.h>
#elif __has_include("RCTBridge.h")
  #import "RCTBridge.h"
#else
  #import "React/RCTBridge.h"
#endif

#if __has_include("RCTConvert.h")
  #import "RCTConvert.h"
#else
  #import <React/RCTConvert.h>
#endif

#import "RCTConvert+RNPStatus.h"

#if __has_include("RCTEventDispatcher.h")
  #import "RCTEventDispatcher.h"
#else
  #import <React/RCTEventDispatcher.h>
#endif

#import "RNPLocation.h"
#import "RNPBluetooth.h"
#import "RNPNotification.h"
#import "RNPAudioVideo.h"
#import "RNPEvent.h"
#import "RNPPhoto.h"
#import "RNPContacts.h"
#import "RNPBackgroundRefresh.h"
#import "RNPSpeechRecognition.h"

@interface RNPermissions()

@property (strong, nonatomic) RNPLocation *location;
@property (strong, nonatomic) RNPNotification *notification;
@property (strong, nonatomic) RNPBluetooth *bluetooth;

@end

@implementation RNPermissions


RCT_EXPORT_MODULE();
@synthesize bridge = _bridge;

/**
 * run on the main queue.
 */
- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_REMAP_METHOD(canOpenSettings, canOpenSettings:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@(UIApplicationOpenSettingsURLString != nil));
}

RCT_EXPORT_METHOD(openSettings:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if (@(UIApplicationOpenSettingsURLString != nil)) {

        NSNotificationCenter * __weak center = [NSNotificationCenter defaultCenter];
        id __block token = [center addObserverForName:UIApplicationDidBecomeActiveNotification
                                               object:nil
                                                queue:nil
                                           usingBlock:^(NSNotification *note) {
                                               [center removeObserver:token];
                                               resolve(@YES);
                                           }];

        NSURL *url = [NSURL URLWithString:UIApplicationOpenSettingsURLString];
        [[UIApplication sharedApplication] openURL:url];
    }
}

RCT_REMAP_METHOD(getPermissionStatus, getPermissionStatus:(RNPType)type json:(id)json resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *status;

    switch (type) {

        case RNPTypeLocation: {
            NSString *locationPermissionType = [RCTConvert NSString:json];
            status = [RNPLocation getStatusForType:locationPermissionType];
            break;
        }
        case RNPTypeCamera:
            status = [RNPAudioVideo getStatus:@"video"];
            break;
        case RNPTypeMicrophone:
            status = [RNPAudioVideo getStatus:@"audio"];
            break;
        case RNPTypePhoto:
            status = [RNPPhoto getStatus];
            break;
        case RNPTypeContacts:
            status = [RNPContacts getStatus];
            break;
        case RNPTypeEvent:
            status = [RNPEvent getStatus:@"event"];
            break;
        case RNPTypeReminder:
            status = [RNPEvent getStatus:@"reminder"];
            break;
        case RNPTypeBluetooth:
            status = [RNPBluetooth getStatus];
            break;
        case RNPTypeNotification:
            status = [RNPNotification getStatus];
            break;
        case RNPTypeBackgroundRefresh:
            status = [RNPBackgroundRefresh getStatus];
            break;
        case RNPTypeSpeechRecognition:
            status = [RNPSpeechRecognition getStatus];
            break;
        default:
            break;
    }

    resolve(status);
}

RCT_REMAP_METHOD(requestPermission, permissionType:(RNPType)type json:(id)json resolve:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *status;

    switch (type) {
        case RNPTypeLocation:
            return [self requestLocation:json resolve:resolve];
        case RNPTypeCamera:
            return [RNPAudioVideo request:@"video" completionHandler:resolve];
        case RNPTypeMicrophone:
            return [RNPAudioVideo request:@"audio" completionHandler:resolve];
        case RNPTypePhoto:
            return [RNPPhoto request:resolve];
        case RNPTypeContacts:
            return [RNPContacts request:resolve];
        case RNPTypeEvent:
            return [RNPEvent request:@"event" completionHandler:resolve];
        case RNPTypeReminder:
            return [RNPEvent request:@"reminder" completionHandler:resolve];
        case RNPTypeBluetooth:
            return [self requestBluetooth:resolve];
        case RNPTypeNotification:
            return [self requestNotification:json resolve:resolve];
        case RNPTypeSpeechRecognition:
            return [RNPSpeechRecognition request:resolve];
        default:
            break;
    }
}

- (void)requestLocation:(id)json resolve:(RCTPromiseResolveBlock)resolve
{
    if (self.location == nil) {
        self.location = [[RNPLocation alloc] init];
    }

    NSString *type = [RCTConvert NSString:json];

    [self.location request:type completionHandler:resolve];
}

- (void)requestNotification:(id)json resolve:(RCTPromiseResolveBlock)resolve
{
    NSArray *typeStrings = [RCTConvert NSArray:json];

    UIUserNotificationType types;
    if ([typeStrings containsObject:@"alert"])
        types = types | UIUserNotificationTypeAlert;

    if ([typeStrings containsObject:@"badge"])
        types = types | UIUserNotificationTypeBadge;

    if ([typeStrings containsObject:@"sound"])
        types = types | UIUserNotificationTypeSound;


    if (self.notification == nil) {
        self.notification = [[RNPNotification alloc] init];
    }

    [self.notification request:types completionHandler:resolve];
}

- (void)requestBluetooth:(RCTPromiseResolveBlock)resolve
{
    if (self.bluetooth == nil) {
        self.bluetooth = [[RNPBluetooth alloc] init];
    }

    [self.bluetooth request:resolve];
}

@end
