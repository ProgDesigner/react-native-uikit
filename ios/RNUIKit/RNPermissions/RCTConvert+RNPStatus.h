//
//  RCTConvert+RNPStatus
//  RCTPermissions
//

#if __has_include("RCTConvert.h")
  #import "RCTConvert.h"
#else
  #import <React/RCTConvert.h>
#endif

static NSString* RNPStatusUndetermined = @"undetermined";
static NSString* RNPStatusDenied = @"denied";
static NSString* RNPStatusAuthorized = @"authorized";
static NSString* RNPStatusRestricted = @"restricted";


typedef NS_ENUM(NSInteger, RNPType) {
    RNPTypeUnknown,
    RNPTypeBackgroundRefresh,
    RNPTypeBluetooth,
    RNPTypeCamera,
    RNPTypeContacts,
    RNPTypeEvent,
    RNPTypeLocation,
    RNPTypeMicrophone,
    RNPTypeNotification,
    RNPTypePhoto,
    RNPTypeReminder,
    RNPTypeSpeechRecognition
};

@interface RCTConvert (RNPStatus)

@end
