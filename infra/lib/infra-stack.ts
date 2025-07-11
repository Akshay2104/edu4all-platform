import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // 1. Create IAM User
    const eduallPlatformUser = new iam.User(this, 'EduallPlatformUser', {
      userName: 'eduall-platform-user',
    });

    // 2. Attach AdministratorAccess policy (for personal learning)
    eduallPlatformUser.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')
    );

    // 3. (Optional) Create Access Keys
    const accessKey = new iam.CfnAccessKey(this, 'EduallPlatformUserAccessKey', {
      userName: eduallPlatformUser.userName,
    });

    // Output access key and secret in terminal (be careful!)
    new cdk.CfnOutput(this, 'AccessKeyId', {
      value: accessKey.ref,
    });

    new cdk.CfnOutput(this, 'SecretAccessKey', {
      value: accessKey.attrSecretAccessKey,
    });
  }
}
