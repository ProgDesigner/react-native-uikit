//
//  RNPEvent.h
//  RCTPermissions
//

#import <Foundation/Foundation.h>
#import "RCTConvert+RNPStatus.h"

@interface RNPEvent : NSObject

+ (NSString *)getStatus:(NSString *)type;
+ (void)request:(NSString *)type completionHandler:(void (^)(NSString *))completionHandler;

@end
