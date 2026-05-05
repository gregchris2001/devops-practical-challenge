# Architecture Diagram

```mermaid
flowchart TB
  subgraph Source["Source Control and CI/CD"]
    Dev["Developer"] --> Repo["GitHub Repository"]
    Repo --> Workflow["GitHub Actions Workflow"]
    Workflow --> Test["npm test"]
    Workflow --> Build["docker build"]
    Workflow --> Push["docker push"]
    Workflow --> Apply["terraform apply"]
  end

  subgraph AWS["AWS Account"]
    State["S3 Terraform State"]
    Lock["DynamoDB State Lock"]
    ECR["Amazon ECR Repository"]

    subgraph VPC["VPC 10.20.0.0/16"]
      IGW["Internet Gateway"]

      subgraph PubA["Public Subnet AZ A"]
        ALBA["ALB Node"]
        NAT["NAT Gateway"]
      end

      subgraph PubB["Public Subnet AZ B"]
        ALBB["ALB Node"]
      end

      subgraph PrivA["Private Subnet AZ A"]
        TaskA["Fargate Task"]
      end

      subgraph PrivB["Private Subnet AZ B"]
        TaskB["Fargate Task"]
      end

      TG["ALB Target Group"]
      Service["ECS Service"]
      Cluster["ECS Cluster"]
    end

    Logs["CloudWatch Log Group"]
    Insights["ECS Container Insights"]
    Autoscaling["Application Auto Scaling"]
  end

  User["Internet User"] --> IGW
  IGW --> ALBA
  IGW --> ALBB
  ALBA --> TG
  ALBB --> TG
  TG --> TaskA
  TG --> TaskB
  Service --> TaskA
  Service --> TaskB
  Cluster --> Service
  TaskA --> Logs
  TaskB --> Logs
  Cluster --> Insights
  Autoscaling --> Service
  Push --> ECR
  ECR --> TaskA
  ECR --> TaskB
  Apply --> State
  Apply --> Lock
```

## Request Flow

1. A user sends an HTTP request to the public ALB DNS name.
2. The ALB routes the request to healthy ECS tasks in private subnets.
3. The Node.js service responds and writes structured JSON logs to stdout.
4. The ECS awslogs driver sends container logs to CloudWatch Logs.
5. ECS Container Insights publishes service metrics for basic operational visibility.

## Deployment Flow

1. A commit to `main` starts the GitHub Actions workflow.
2. Tests run before any deployment work.
3. Terraform ensures ECR exists.
4. The workflow builds and pushes a commit-tagged Docker image.
5. Terraform applies the ECS task definition update using the new image tag.
6. ECS performs a rolling deployment behind the ALB.
