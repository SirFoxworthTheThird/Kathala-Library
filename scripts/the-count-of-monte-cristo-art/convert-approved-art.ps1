param([int]$Quality = 90)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$repo = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$manifest = Get-Content -LiteralPath (Join-Path $PSScriptRoot 'manifest.json') -Raw -Encoding UTF8 | ConvertFrom-Json
$encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg' | Select-Object -First 1
$parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
$parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
$converted = 0
foreach ($slot in $manifest.slots) {
    if ($slot.status -ne 'generated_png') { continue }
    $source = Join-Path $repo ($slot.masterPath -replace '/', '\')
    $target = Join-Path $repo ($slot.path -replace '/', '\')
    if (-not (Test-Path -LiteralPath $source)) { throw "Missing PNG master: $source" }
    $image = [System.Drawing.Image]::FromFile($source)
    try { $image.Save($target, $encoder, $parameters) }
    finally { $image.Dispose() }
    $converted++
}
$parameters.Dispose()
Write-Output "Converted $converted approved PNG masters to JPEG."
