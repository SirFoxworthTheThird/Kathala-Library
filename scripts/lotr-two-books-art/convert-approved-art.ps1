$ErrorActionPreference = 'Stop'
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'manifest.json') -Raw | ConvertFrom-Json
Add-Type -AssemblyName System.Drawing
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
$parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]90)
$count = 0
foreach ($asset in $manifest.assets) {
    if ($asset.status -ne 'generated_png') { continue }
    $source = Join-Path $repo $asset.masterPath
    $target = Join-Path $repo $asset.path
    if (-not (Test-Path -LiteralPath $source)) { throw "Missing PNG master: $($asset.masterPath)" }
    New-Item -ItemType Directory -Path (Split-Path $target) -Force | Out-Null
    $image = [System.Drawing.Image]::FromFile($source)
    try { $image.Save($target, $codec, $parameters) }
    finally { $image.Dispose() }
    $count++
}
$parameters.Dispose()
Write-Output "Converted $count generated illustrations to final JPEG."
