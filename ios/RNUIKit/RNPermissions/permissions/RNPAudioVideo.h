//
//  RNPAudioVideo.h
//  RCTPermissions
//

#import <Foundation/Foundation.h>
#import "RCTConvert+RNPStatus.h"

@interface RNPAudioVideo : NSObject

+ (NSString *)getStatus:(NSString *)type;
+ (void)request:(NSString *)type completionHandler:(void (^)(NSString *))completionHandler;

@end
