//
//  RNDevice.h
//

#import <UIKit/UIKit.h>
#import <sys/utsname.h>

#if __has_include(<React/RCTBridgeModule.h>)
  #import <React/RCTBridgeModule.h>
#else
  #import "RCTBridgeModule.h"
#endif

@interface RNDevice : NSObject <RCTBridgeModule>

@end
