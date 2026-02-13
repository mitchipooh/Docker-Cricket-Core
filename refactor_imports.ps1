$appsDir = "e:\Docker cricket-core-pro-managment system\apps"
$files = Get-ChildItem -Path $appsDir -Include *.ts, *.tsx -Recurse

foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    # 1. Remove .ts and .tsx extensions from @cricket/shared imports
    # Example: from '@cricket/shared/scoring/hooks/useMatchEngine.ts' -> from '@cricket/shared/scoring/hooks/useMatchEngine'
    $content = $content -replace "from\s+(['\"])(@cricket/shared/[^'\"]+)\.(ts|tsx)(['\"])", 'from $1$2$4'
    
    # 2. Fix any common relative paths that were missed or need standardizing
    $content = $content.Replace("../../types", "@cricket/shared")
    $content = $content.Replace("../../utils/", "@cricket/shared/utils/")
    $content = $content.Replace("../../services/", "@cricket/shared/services/")
    $content = $content.Replace("../../hooks/", "@cricket/shared/hooks/")
    $content = $content.Replace("../../scoring/", "@cricket/shared/scoring/")
    
    # Depth 3
    $content = $content.Replace("../../../types", "@cricket/shared")
    $content = $content.Replace("../../../utils/", "@cricket/shared/utils/")
    $content = $content.Replace("../../../services/", "@cricket/shared/services/")
    $content = $content.Replace("../../../hooks/", "@cricket/shared/hooks/")
    $content = $content.Replace("../../../scoring/", "@cricket/shared/scoring/")

    # Old alias
    $content = $content.Replace("@shared/", "@cricket/shared/")

    [System.IO.File]::WriteAllText($file.FullName, $content)
}
