//
//  RNPBluetooth.h
//  RCTPermissions
//

#import <Foundation/Foundation.h>
#import "RCTConvert+RNPStatus.h"

@interface RNPBluetooth : NSObject

+ (NSString *)getStatus;
- (void)request:(void (^)(NSString *))completionHandler;

@end
