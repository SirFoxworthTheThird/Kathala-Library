param([int]$Quality = 84)
Add-Type -AssemblyName System.Drawing
$repo = Resolve-Path (Join-Path $PSScriptRoot '..\..')
$art = Join-Path $repo 'library\pride-and-prejudice\art\generated'
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
$parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
$files = @(Get-ChildItem $art -Recurse -Filter '*.png' | Sort-Object FullName)
foreach ($file in $files) {
  $image = [System.Drawing.Image]::FromFile($file.FullName)
  $target = [System.IO.Path]::ChangeExtension($file.FullName, '.jpg')
  $image.Save($target, $codec, $parameters)
  $image.Dispose()
  $check = [System.Drawing.Image]::FromFile($target)
  $check.Dispose()
  Write-Output $target
}
$parameters.Dispose()
