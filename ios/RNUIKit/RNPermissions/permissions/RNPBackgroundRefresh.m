//
//  RNPBackgroundRefresh.m
//  RCTPermissions
//

#import "RNPBackgroundRefresh.h"

@implementation RNPBackgroundRefresh

+(NSString *)getStatus
{
    int status = [[UIApplication sharedApplication] backgroundRefreshStatus];
    switch (status) {
        case UIBackgroundRefreshStatusAvailable:
            return RNPStatusAuthorized;
        case UIBackgroundRefreshStatusDenied:
            return RNPStatusDenied;
        case UIBackgroundRefreshStatusRestricted:
            return RNPStatusRestricted;
        default:
            return RNPStatusUndetermined;
    }

}
@end
