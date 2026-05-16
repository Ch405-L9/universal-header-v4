#!/usr/bin/env bash
set -euo pipefail

# ==============================================================================
# Universal Header v4 - Smart Git Workflow Script
# ==============================================================================

# Configuration
REPO_DIR="/home/t0n34781/universal-header-v4-Web-Ops"
MAIN_BRANCH="Web-Ops"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}●${NC} $1"; }
log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; exit 1; }

# ==============================================================================
# Pre-flight Checks
# ==============================================================================

preflight_checks() {
    log_info "Running pre-flight checks..."
    
    [[ -d "$REPO_DIR/.git" ]] || log_error "Not a git repository: $REPO_DIR"
    cd "$REPO_DIR" || log_error "Cannot cd to $REPO_DIR"
    
    command -v gh >/dev/null 2>&1 || log_error "GitHub CLI not installed. Run: brew install gh"
    command -v git >/dev/null 2>&1 || log_error "git not installed"
    
    gh auth status >/dev/null 2>&1 || log_error "Not authenticated. Run: gh auth login"
    
    log_success "Pre-flight checks passed"
}

# ==============================================================================
# YAML Validation
# ==============================================================================

validate_yaml() {
    log_info "Validating YAML files..."
    
    local yaml_files=$(find .github/workflows -name "*.yml" -o -name "*.yaml" 2>/dev/null || true)
    
    if [[ -z "$yaml_files" ]]; then
        log_warn "No workflow YAML files found"
        return 0
    fi
    
    if command -v python3 >/dev/null 2>&1; then
        for file in $yaml_files; do
            python3 -c "import yaml; yaml.safe_load(open('$file'))" 2>/dev/null
            [[ $? -eq 0 ]] && log_success "Valid: $file" || log_error "Invalid YAML: $file"
        done
    else
        log_warn "Python3 not found, skipping YAML validation"
    fi
}

# ==============================================================================
# Quick Mode (No Prompts)
# ==============================================================================

quick_mode() {
    local commit_msg="$1"
    local branch_name="security/hardening-$(date +%b%d-%H%M | tr '[:upper:]' '[:lower:]')"
    
    log_info "QUICK MODE: $branch_name"
    
    validate_yaml
    
    # Update main
    git fetch origin "$MAIN_BRANCH"
    git checkout "$MAIN_BRANCH" 2>/dev/null || true
    git pull origin "$MAIN_BRANCH"
    
    # Create branch
    git checkout -b "$branch_name"
    
    # Commit
    git add -A
    git commit -m "$commit_msg"
    
    # Push
    git push -u origin "$branch_name"
    
    # Create PR
    gh pr create \
        --base "$MAIN_BRANCH" \
        --title "$commit_msg" \
        --body "Automated commit via workflow script" \
        --fill
    
    log_success "Pushed & PR created: $branch_name"
    
    # Watch CI
    log_info "Watching CI (Ctrl+C to exit)..."
    gh run watch || log_info "View logs: gh run view --log-failed"
}

# ==============================================================================
# Interactive Mode
# ==============================================================================

interactive_mode() {
    validate_yaml
    
    # Update main
    log_info "Syncing with $MAIN_BRANCH..."
    git fetch origin "$MAIN_BRANCH"
    CURRENT=$(git rev-parse --abbrev-ref HEAD)
    
    if [[ "$CURRENT" != "$MAIN_BRANCH" ]]; then
        git checkout "$MAIN_BRANCH"
    fi
    git pull origin "$MAIN_BRANCH"
    
    # Branch name
    local default_branch="security/hardening-$(date +%b%d-%H%M | tr '[:upper:]' '[:lower:]')"
    read -p "Branch name [$default_branch]: " branch_name
    branch_name=${branch_name:-$default_branch}
    
    git checkout -b "$branch_name"
    log_success "Created: $branch_name"
    
    # Show status
    git status --short
    
    if [[ -z $(git status --porcelain) ]]; then
        log_warn "No changes to commit"
        exit 0
    fi
    
    # Stage
    read -p "Stage all? [Y/n] " -n 1 -r; echo
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        git add -A
    else
        read -p "Files to stage: " files
        git add ${files:-"-A"}
    fi
    
    # Commit
    read -p "Commit message: " commit_msg
    [[ -z "$commit_msg" ]] && log_error "Commit message required"
    
    git commit -m "$commit_msg"
    
    # Push
    git push -u origin "$branch_name"
    log_success "Pushed"
    
    # PR
    read -p "Create PR? [Y/n] " -n 1 -r; echo
    if [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]]; then
        read -p "PR title [$commit_msg]: " pr_title
        pr_title=${pr_title:-$commit_msg}
        
        gh pr create \
            --base "$MAIN_BRANCH" \
            --title "$pr_title" \
            --body "Security hardening updates" \
            --fill
        
        log_success "PR created"
        
        # Watch
        read -p "Watch CI? [Y/n] " -n 1 -r; echo
        [[ $REPLY =~ ^[Yy]$ ]] || [[ -z $REPLY ]] && gh run watch
    fi
}

# ==============================================================================
# Main
# ==============================================================================

main() {
    echo ""
    echo "========================================================================"
    echo "  Universal Header v4 - Smart Git Workflow"
    echo "========================================================================"
    echo ""
    
    preflight_checks
    
    if [[ $# -gt 0 ]]; then
        quick_mode "$*"
    else
        interactive_mode
    fi
    
    echo ""
    log_success "Workflow complete!"
    echo ""
    echo "Commands:"
    echo "  gh run watch              # Watch CI live"
    echo "  gh run view --log-failed  # View failures"
    echo "  gh pr view --web          # Open PR"
    echo ""
}

main "$@"
