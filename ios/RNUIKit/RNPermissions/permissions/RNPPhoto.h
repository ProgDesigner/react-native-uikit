//
//  RNPPhoto.h
//  RCTPermissions
//

#import <Foundation/Foundation.h>
#import "RCTConvert+RNPStatus.h"

@interface RNPPhoto : NSObject

+ (NSString *)getStatus;
+ (void)request:(void (^)(NSString *))completionHandler;

@end
