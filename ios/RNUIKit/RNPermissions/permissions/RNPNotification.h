//
//  RNPNotification.h
//  RCTPermissions
//

#import <Foundation/Foundation.h>
#import "RCTConvert+RNPStatus.h"

@interface RNPNotification : NSObject

+ (NSString *)getStatus;
- (void)request:(UIUserNotificationType)types completionHandler:(void (^)(NSString*))completionHandler;

@end
