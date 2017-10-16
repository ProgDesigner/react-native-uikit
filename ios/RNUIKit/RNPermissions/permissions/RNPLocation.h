//
//  RNPLocation.h
//  RCTPermissions
//

#import <Foundation/Foundation.h>
#import "RCTConvert+RNPStatus.h"

@interface RNPLocation : NSObject

+ (NSString *)getStatusForType:(NSString *)type;
- (void)request:(NSString *)type completionHandler:(void (^)(NSString *))completionHandler;

@end
