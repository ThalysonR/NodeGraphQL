#!/bin/groovy
def getRepo(String branch) {
  def finalBranch = branch.replace('origin/', '')
  def repo
  switch(finalBranch) {
    case 'master':
          repo = 'frontend-releases'
          break
      case 'homologacao':
          repo = 'frontend-homologacao'
          break
      default:
          repo = 'frontend-desenv'
  }
  return repo
}

pipeline {
    agent any

    environment {
        PKG = readJSON file: 'package.json'
        PKG_NAME = "${PKG['name']}"
        PKG_VERSION = "${PKG['version']}"
        REPOSITORY = getRepo("${GIT_BRANCH}")
    }

  tools {
    nodejs 'Node 11.14.0'
  }
  stages {
    stage('Startup') {
      steps {
        script {
          sh 'npm install'
        }
      }
    }
    stage('Test') {
      steps {
        script {
          sh 'npm run testCoverage'
        }
      }
      post {
        always {
          step([$class: 'CoberturaPublisher', coberturaReportFile: 'output/coverage/jest/cobertura-coverage.xml'])
        }
      }
    }
    stage('Build') {
      steps {
        script {
          sh 'npm run build'
          sh 'tar -czvf dist.tar.gz dist/'
        }
      }
    }
    stage('Publish') {
      when {
        expression {
          currentBuild.result == null || currentBuild.result == 'SUCCESS'
        }
      }
      steps {
        nexusPublisher nexusInstanceId: 'Nexus_Local', nexusRepositoryId: "${REPOSITORY}", packages: [[$class: 'MavenPackage', mavenAssetList: [[classifier: '', extension: '', filePath: "dist.tar.gz"]], mavenCoordinate: [artifactId: "${PKG_NAME}", groupId: "br.com.pemaza", packaging: 'tar.gz', version: "${PKG_VERSION}"]]]
      }
    }
  }
}